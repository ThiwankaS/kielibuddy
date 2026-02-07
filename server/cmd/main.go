package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main () {
	
	// Reading the enviorenment variables
	port		:= os.Getenv("PORT")
	if port == "" {
		port = "8080"
	} 
	envType		:= os.Getenv("APP_ENV")
	mongoURI	:= os.Getenv("MONGO_URI")

	fmt.Println("----------------- Starting the app in %s mode -----------------", envType)

	// Connecting to MongoDB
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(mongoURI))
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
		fmt.Fprintf(w, "Hello from the %S Backend !", envType)
	})

	fs := http.FileServer(http.Dir("./dist"))
	http.Handle("/", fs)

	fmt.Printf("KieliBuddy server running on port %s in %s mode...\n", port, envType)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}