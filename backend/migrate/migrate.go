package main

import (
	"fmt"
	"okamotoApp/db"
	"okamotoApp/model"
)

func main() {
	dbConn := db.NewDB()
	defer fmt.Println("Successfully Migrated")
	defer db.CloseDB(dbConn)
	dbConn.AutoMigrate(&model.User{}, &model.Store{})
}

