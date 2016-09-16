defmodule RocketLaunches.PageController do
  use RocketLaunches.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end

  def test(conn, params) do
    IO.inspect params
    render conn, "index.html"
  end
end
