package main

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"github.com/thiwankas/kielibuddy/server/internal/config"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main () {
	
	// Loading server configurations
	cfg, err := config.NewConfig()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("----------------- Starting the app in %s mode -----------------\n", cfg.Env)

	// Connecting to MongoDB
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(cfg.Uri))
	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal("Could not connected to MongoDB", err)
	}

	fmt.Println("Sucessfully conected to MongoDB!")

	// Test api
	http.HandleFunc("/api/hello", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello from the %S Backend !", cfg.Env)
	})

	fs := http.FileServer(http.Dir("./dist"))
	http.Handle("/", fs)

	fmt.Printf("KieliBuddy server running on port %s in %s mode...\n", cfg.Port, cfg.Env)
	log.Fatal(http.ListenAndServe(":"+cfg.Port, nil))
}