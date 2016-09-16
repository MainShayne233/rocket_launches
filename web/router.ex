defmodule RocketLaunches.Router do
  use RocketLaunches.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", RocketLaunches do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    post "/create", SubscriptionController, :create
  end

  # Other scopes may use custom stacks.
  scope "/api", RocketLaunches do
    pipe_through :api

    get "/get_rockets", RocketController, :get_rockets
    get "/get_locations", LocationController, :get_locations

  end
end
