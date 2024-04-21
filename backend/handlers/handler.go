package handlers

import (
	"net/http"
	"app/services"
	"encoding/json"
)

func HelloWorld(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello World"))
}

func GetStores(w http.ResponseWriter, r *http.Request) {
	stores, err := services.GetStores()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(stores)	
}
