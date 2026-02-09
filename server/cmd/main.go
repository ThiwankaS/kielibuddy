package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/thiwankas/kielibuddy/server/internal/config"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {

	// Loading server configurations
	cfg, err := config.NewConfig()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("----------------- Starting the app -----------------\n")

	// Wating for 30 seconds to check the connection
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
	defer cancel() // Resource clean-up

	// Connecting to MongoDB
	// Initializing the connection
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(cfg.Uri))
	if err != nil {
		// This fails due to incorrect mongoDB URI errors
		log.Fatal(err)
	}

	// Check for connection is success
	err = client.Ping(ctx, nil)
	if err != nil {
		// This fails due to network-authentication errors
		log.Fatal("Could not connected to MongoDB", err)
	}

	fmt.Printf("Successfully connected to MongoDB!\n")

	app := &application{
		config: cfg,
		db:     client,
	}

	if err := app.run(app.mount()); err != nil {
		log.Fatal("Server failed to start!")
	}
}
