package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/thiwankas/kielibuddy/model"
	"github.com/thiwankas/kielibuddy/repository"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {

	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// if PORT is not set inside the .env file will set a default value 8080
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// if MONGO_URI not set inside the .env will run the program without DB
	mongoURI := os.Getenv("MONGO_URI")
	if mongoURI == "" {
		log.Println("MONGO_URI not set, running without DB")
	}

	// extablishing the connection with mongoDB
	var userRepo *repository.UserRepository
	if mongoURI != "" {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		client, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoURI))
		if err != nil {
			log.Fatalf("Failed to connect to MongoDB: %v", err)
		}
		defer client.Disconnect(ctx)

		// access DB_USERS from .env
		dbName := os.Getenv("DB_USERS")

		// connect with the DB_USERS
		db := client.Database(dbName)
		userRepo = repository.NewUserRepository(db)
		log.Println("Connected to MongoDB")
	}

	r := mux.NewRouter()

	// API Health Check
	r.HandleFunc("/api/v1/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		fmt.Fprintf(w, `{"status": "Kielibuddy API is live"}`)
	}).Methods("GET")

	// Example User Routes (only if DB is connected)
	if userRepo != nil {

		// creating a new user
		r.HandleFunc("/api/v1/users", func(w http.ResponseWriter, r *http.Request) {
			var user model.User
			if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
				http.Error(w, err.Error(), http.StatusBadRequest)
				return
			}
			if err := userRepo.CreateUser(r.Context(), &user); err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(user)
		}).Methods("POST")
	}

	// Serve React Frontend
	staticPath := "./dist"
	r.PathPrefix("/").Handler(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		path := filepath.Join(staticPath, r.URL.Path)
		if _, err := os.Stat(path); os.IsNotExist(err) {
			http.ServeFile(w, r, filepath.Join(staticPath, "index.html"))
			return
		}
		http.FileServer(http.Dir(staticPath)).ServeHTTP(w, r)
	}))

	fmt.Printf("Kielibuddy starting on :%s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, r))
}
