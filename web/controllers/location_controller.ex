defmodule RocketLaunches.LocationController do
  use RocketLaunches.Web, :controller
  alias RocketLaunches.Location

  def get_locations conn, _ do
    locations = Location
                |> Repo.all
                |> Enum.map(&(&1.name))
                |> Enum.sort


    json conn, %{locations: locations}
  end

end
