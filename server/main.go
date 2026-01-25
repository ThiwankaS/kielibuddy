package main

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// API Health Check
	http.HandleFunc("/api/v1/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		fmt.Fprintf(w, `{"status": "Kielibuddy API is live"}`)
	})

	// Serve React Frontend
	staticPath := "./dist"
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		path := filepath.Join(staticPath, r.URL.Path)
		if _, err := os.Stat(path); os.IsNotExist(err) {
			http.ServeFile(w, r, filepath.Join(staticPath, "index.html"))
			return
		}
		http.FileServer(http.Dir(staticPath)).ServeHTTP(w, r)
	})

	fmt.Printf("Kielibuddy starting on :%s\n", port)
	http.ListenAndServe(":"+port, nil)
}
