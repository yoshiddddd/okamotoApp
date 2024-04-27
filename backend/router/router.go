package router

import (
	"okamotoApp/controller"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func NewRouter(uc controller.IUserController, sc controller.IStoreController) *echo.Echo {
	e := echo.New()

	// CORS ミドルウェアの設定
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},  // すべてのドメインからのアクセスを許可
		AllowMethods: []string{echo.GET, echo.POST, echo.PUT, echo.DELETE},  // 許可するHTTPメソッド
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))

	e.POST("/signup", uc.SignUp)
	e.POST("/login", uc.LogIn)
	e.POST("/logout", uc.LogOut)
	e.GET("/csrf", uc.CsrfToken)

	t := e.Group("/stores")
	t.GET("", sc.List)
	t.GET("/detail/:store_id", sc.Get)
	t.POST("/insert", sc.Insert)
	t.PUT("/update/:store_id", sc.Update)
	t.DELETE("/delete/:store_id", sc.Delete)

	return e
}