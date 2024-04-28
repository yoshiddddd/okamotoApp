package usecase

import (
	"okamotoApp/model"
	"okamotoApp/repository"

	"fmt"
)

type IStoreUsecase interface {
	List() ([]model.Store, error)
	Get(storeID int) (model.Store, error)
	Insert(store model.Store) (model.Store, error)
	Update(store model.Store, storeID int) (model.Store, error)
	Delete(storeID int) error
}

type StoreUsecase struct {
	sr repository.IStoreRepository	
}

func NewStoreUsecase(sr repository.IStoreRepository) IStoreUsecase {
	return &StoreUsecase{
		sr : sr,
	}
}

func (su *StoreUsecase) List() ([]model.Store, error) {
	stores := []model.Store{}
	if err := su.sr.List(&stores); err != nil {
		return nil, err
	}

	respnseStores := []model.Store{}
	for _, v := range stores {
		store := model.Store{
			ID: v.ID,
			Name: v.Name,
			Address : v.Address,
			Information: v.Information,
			Category: v.Category,
			Payment : v.Payment,
			CreatedAt: v.CreatedAt,
			UpdatedAt: v.UpdatedAt,
		}
		respnseStores = append(respnseStores, store)
	}
	return respnseStores, nil
}

func (su *StoreUsecase) Get(storeID int) (model.Store, error) {
	store := model.Store{}
	if err := su.sr.Get(&store, storeID); err != nil {
		return model.Store{}, err
	}
	fmt.Print(store)
	responseStore := model.Store{
		ID: store.ID,
		Name: store.Name,
		Address: store.Address,
		Information: store.Information,
		Category: store.Category,
		Payment : store.Payment,
		CreatedAt: store.CreatedAt,
		UpdatedAt: store.UpdatedAt,
	}
	return responseStore, nil
}

func (su *StoreUsecase) Insert(store model.Store) (model.Store, error) {
	if err := su.sr.Insert(&store); err != nil {
		return model.Store{}, err
	}

	responseStore := model.Store{
		ID: store.ID,
		Name: store.Name,
		Address: store.Address,
		Information: store.Information,
		CreatedAt: store.CreatedAt,
		UpdatedAt: store.UpdatedAt,
	}
	return responseStore, nil
}

func (su *StoreUsecase) Update(store model.Store, storeID int) (model.Store, error) {
	if err := su.sr.Update(&store, storeID); err != nil {
		return model.Store{}, err
	}

	responseStore := model.Store{
		ID: store.ID,
		Name: store.Name,
		Address: store.Address,
		Information: store.Information,
		CreatedAt: store.CreatedAt,
		UpdatedAt: store.UpdatedAt,
	}
	return responseStore, nil
}

func (su *StoreUsecase) Delete(storeID int) error {
	if err := su.sr.Delete(storeID); err != nil {
		return err
	}
	return nil
}