package repository

import (
	"context"
	"os"
	"testing"
	"time"

	"github.com/thiwankas/kielibuddy/model"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func TestUserRepository(t *testing.T) {
	/**
		case : MONGO_URI is not set inside the .env file 
	*/
	mongoURI := os.Getenv("MONGO_URI")
	if mongoURI == "" {
		t.Skip("MONGO_URI not set, skipping integration test")
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoURI))
	if err != nil {
		t.Fatalf("Failed to connect to MongoDB: %v", err)
	}
	defer client.Disconnect(ctx)

	dbName := "test_kielibuddy_" + time.Now().Format("20060102150405")
	db := client.Database(dbName)
	defer db.Drop(ctx)

	repo := NewUserRepository(db)

	t.Run("CreateUser", func(t *testing.T) {
		user := &model.User{
			Email: "test@example.com",
			Name:  "Test User",
		}

		err := repo.CreateUser(ctx, user)
		if err != nil {
			t.Fatalf("CreateUser failed: %v", err)
		}

		if user.ID.IsZero() {
			t.Error("Expected User ID to be set after creation")
		}
	})

	t.Run("GetUser", func(t *testing.T) {
		user := &model.User{
			Email: "get@example.com",
			Name:  "Get User",
		}
		repo.CreateUser(ctx, user)

		fetchedUser, err := repo.GetUser(ctx, user.ID.Hex())
		if err != nil {
			t.Fatalf("GetUser failed: %v", err)
		}

		if fetchedUser.Email != user.Email {
			t.Errorf("Expected email %s, got %s", user.Email, fetchedUser.Email)
		}
	})
}
