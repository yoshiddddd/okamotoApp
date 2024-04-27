package repository

import (
	"gorm.io/gorm"
	"okamotoApp/model"

	"fmt"
)

type IStoreRepository interface {
	List(stores *[]model.Store) error
	Get(store *model.Store ,StoreID int) error
	Insert(store *model.Store) error
	Update(store *model.Store, storeId int) error
	Delete(storeID int) error
}

type StoreRepository struct {
	db *gorm.DB
}

func NewStoreRepository(db *gorm.DB) IStoreRepository {
	return &StoreRepository{
		db : db,
	}
}

func (r *StoreRepository) List(stores *[]model.Store) error {
	if err := r.db.Find(stores).Error; err != nil {
		return err
	}
	return nil
}

func (r *StoreRepository) Get(store *model.Store, storeID int) error {
	if err := r.db.Where("id = ?", storeID).Find(store).Error; err != nil {
		return err
	}
	fmt.Print(store)
	return nil
}

func (r *StoreRepository) Insert(store *model.Store) error {
	if err := r.db.Create(store).Error; err != nil {
		return err
	}
	return nil
}

func (r *StoreRepository) Update(store *model.Store, storeId int) error {
	if err := r.db.Model(store).Where("id = ?", storeId).Updates(store).Error; err != nil {
		return err
	}
	return nil
}

func (r *StoreRepository) Delete(storeID int) error {
	if err := r.db.Where("id = ?", storeID).Delete(&model.Store{}).Error; err != nil {
		return err
	}
	return nil
}