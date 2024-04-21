package services

import (
	"app/models"
	"app/repositories"
)

func GetStores() ([]models.Store, error) {
	db, err := ConnectDB()
	if err != nil {
		return nil, err
	}
	defer db.Close()
	storeArr, err := repositories.GetStores(db)
	if err != nil {
		return nil, err
	}
	return storeArr, nil
}