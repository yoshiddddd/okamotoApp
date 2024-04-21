package repositories

import (
	"app/models"
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
)

func GetStores(db *sql.DB) ([]models.Store, error) {
	const sqlStr = "SELECT * FROM store"

	rows, err := db.Query(sqlStr)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	storeArr := make([]models.Store, 0)
	for rows.Next() {
		var store models.Store
		err := rows.Scan(&store.ID, &store.Name, &store.Address, &store.PhoneNumber, &store.CreatedAt, &store.UpdateAt)
		if err != nil {
			return nil, err
		}
		storeArr = append(storeArr, store)
	}

	return storeArr, err
}