defmodule RocketLaunches.RocketController do
  use RocketLaunches.Web, :controller
  alias RocketLaunches.Rocket

  def get_rockets conn, _ do
    rockets = Rocket
              |> Repo.all
              |> Enum.map(&(&1.name))
              |> Enum.sort


    json conn, %{rockets: rockets}
  end

end
