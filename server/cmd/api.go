package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/thiwankas/kielibuddy/server/internal/config"
	"go.mongodb.org/mongo-driver/mongo"
)

type application struct {
	config 	*config.Config
	db		*mongo.Client
}

func (app *application) mount() http.Handler {
	mux := http.NewServeMux()

	// API routes
	// Health check
	mux.HandleFunc("api/hello", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello from the %s backend!", app.config.Env)
	})

	// Home, Front-end static files
	fs := http.FileServer(http.Dir("./dist"))
	mux.Handle("/", fs)

	return mux
}

func (app *application) run(handler http.Handler) error {
	srv := &http.Server{
		Addr: ":" + app.config.Port,
		Handler: handler,
		WriteTimeout: time.Second * 10,
		ReadTimeout: time.Second * 5,
		IdleTimeout: time.Second * 30,
	}

	fmt.Printf("kielibuddy app is running on %s in %s mode\n", app.config.Port, app.config.Env)
	return srv.ListenAndServe()
}