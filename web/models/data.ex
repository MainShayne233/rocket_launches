defmodule RocketLaunches.Data do
  alias RocketLaunches.Rocket
  alias RocketLaunches.Location

  def update do
    { :ok, data } = "https://launchlibrary.net/1.1/launch/next/50"
                    |> get
    launches = data["launches"]
    launches
    |> Enum.map(&(&1["rocket"]))
    |> Rocket.update
    launches
    |> Enum.map(&(&1["location"]))
    |> Location.update

    :ok
  end

  def get url do
     url
     |> HTTPoison.get
     |> case do
         {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
           {:ok, Poison.decode!(body)}
         {:ok, %HTTPoison.Response{status_code: 404}} ->
           {:error, reason: "not found"}
         {:error, %HTTPoison.Error{reason: reason}} ->
           {:error, reason}
       end
  end



end
