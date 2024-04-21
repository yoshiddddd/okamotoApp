package main

import (
	"github.com/gorilla/mux"
	"net/http"
	"app/handlers"
	_ "github.com/go-sql-driver/mysql"
	"log"
)

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/", handlers.HelloWorld).Methods(http.MethodGet)
	r.HandleFunc("/stores", handlers.GetStores).Methods(http.MethodGet)
	log.Println("server start at port 8080")
    log.Fatal(http.ListenAndServe(":8080", r))
}