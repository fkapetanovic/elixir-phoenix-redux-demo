defmodule Joggernaut.Router do
  use Joggernaut.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug Guardian.Plug.VerifyHeader
    plug Guardian.Plug.LoadResource
  end

  pipeline :authenticated do
    plug Guardian.Plug.VerifyHeader
    plug Guardian.Plug.LoadResource
    plug Guardian.Plug.EnsureAuthenticated, handler: Joggernaut.SessionController
    plug Joggernaut.Plug.CurrentUser
  end

  scope "/api", Joggernaut do
    pipe_through :api

    scope "/v1" do
      post "/sessions", SessionController, :create
      get "/sessions", SessionController, :show
      post "/registrations", RegistrationController, :create

      scope "/auth" do
        pipe_through :authenticated

        delete "/sessions", SessionController, :delete

        resources "/users", UserController do
          get "/jogs/search", JogController, :search
          get "/jogs/report", JogController, :report
          resources "/jogs", JogController
        end
      end
    end
  end

  scope "/", Joggernaut do
    pipe_through :browser

    get "/*path", PageController, :index
  end
end
