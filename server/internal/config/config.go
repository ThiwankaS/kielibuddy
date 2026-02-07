package config

import (
	"errors"
	"os"
)

type Config struct {
	Port	string
	Env		string
	Uri		string
}

// Initialize and returns a poniter to a Config struct or an error if occured
func NewConfig() (*Config, error) {
	// Reading the enviorenment variables
	port := os.Getenv("PORT")
	// Set to the value 8080
	if port == "" {
		port = "8080"
	}

	env	:= os.Getenv("APP_ENV")
	// Set to the default value TESTING
	if env == "" {
		env = "TESTING"
	}

	uri	:= os.Getenv("MONGO_URI")
	// This is going be an critical issue
	if uri == "" {
		return nil, errors.New("MongoDB URI is required!")
	}

	return &Config{
		Port	: port,
		Env		: env,
		Uri		: uri,
	}, nil
}