package main

import (
	"okamotoApp/db"
	"okamotoApp/router"
	"okamotoApp/usecase"
	"okamotoApp/controller"
	"okamotoApp/repository"
)

func main() {
	db := db.NewDB()

	userRepository := repository.NewUserRepository(db)
	storeRepository := repository.NewStoreRepository(db)

	userUsecase := usecase.NewUserUsecase(userRepository)
	storeUsecase := usecase.NewStoreUsecase(storeRepository)

	userController := controller.NewUserController(userUsecase)
	storeController := controller.NewStoreController(storeUsecase)

	e := router.NewRouter(userController, storeController)
	e.Logger.Fatal(e.Start(":8080"))
}