package controller

import (
	"net/http"
	"okamotoApp/model"
	"okamotoApp/usecase"
	"strconv"
	"fmt"

	"github.com/labstack/echo/v4"
)

type IStoreController interface {
	List(c echo.Context) error
	Get(c echo.Context) error
	Insert(c echo.Context) error
	Update(c echo.Context) error
	Delete(c echo.Context) error
}

type storeController struct {
	su usecase.IStoreUsecase
}

func NewStoreController(su usecase.IStoreUsecase) IStoreController {
	return &storeController{su}
}

func (sc *storeController) List(c echo.Context) error {
	storesResponse, err := sc.su.List()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	fmt.Print(storesResponse)
	return c.JSON(http.StatusOK, storesResponse)
}

func (sc *storeController) Get(c echo.Context) error {
	storeIDStr := c.Param("store_id")
	fmt.Printf("storeID %s\n", storeIDStr)
	storeID, _ := strconv.Atoi(storeIDStr)
	storeResponse, err := sc.su.Get(storeID)
	fmt.Print("-----\n")
	fmt.Print(storeResponse)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, storeResponse)
}

func (sc *storeController) Insert(c echo.Context) error {
	store := model.Store{}
	if err := c.Bind(&store); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	fmt.Print(store)
	storesResponse, err := sc.su.Insert(store)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, storesResponse)
}

func (sc *storeController) Update(c echo.Context) error {
	storeIDStr := c.Param("store_id")
	storeID, _ := strconv.Atoi(storeIDStr)

	store := model.Store{}
	if err := c.Bind(&store); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	storesResponse, err := sc.su.Update(store, storeID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, storesResponse)
}

func (sc *storeController) Delete(c echo.Context) error {
	storeIDStr := c.Param("store_id")
	storeID, _ := strconv.Atoi(storeIDStr)

	err := sc.su.Delete(storeID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.NoContent(http.StatusNoContent)
}
