package services

import (
	"database/sql"
	"fmt"
	// "os"

	_ "github.com/go-sql-driver/mysql"
)

var (
	// dbUser     = os.Getenv("DB_USER")
	// dbPassword = os.Getenv("DB_PASSWORD")
	// dbDatabase = os.Getenv("DB_NAME")
	dbUser    =  "user"
	dbPassword = "pass"
	dbDatabase = "db"
	dbConn     = fmt.Sprintf("%s:%s@tcp(127.0.0.1:3306)/%s?parseTime=true", dbUser, dbPassword, dbDatabase)
)

func ConnectDB() (*sql.DB, error) {
	fmt.Println(dbConn)
	db, err := sql.Open("mysql", dbConn)
	if err != nil {
		return nil, err
	}
	return db, nil
}