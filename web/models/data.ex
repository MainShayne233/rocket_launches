defmodule RocketLaunches.Data do
  alias RocketLaunches.Rocket
  alias RocketLaunches.Location
  alias RocketLaunches.Data
  alias RocketLaunches.Launch

  def update do
    { :ok, data } = "https://launchlibrary.net/1.1/launch/next/50"
                    |> get
    launches = Launch.from(data)
    |> Rocket.update
    launches
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

  def today_for time_zone do
    Timex.now(time_zone)
    |> parsed_date_time
  end

  def parsed_date_time date_time do
    %{
      month:    date_time |> Timex.format!("%B", :strftime),
      day:      date_time |> Timex.format!("%e", :strftime),
      year:     date_time |> Timex.format!("%G", :strftime),
      hour:     date_time |> Timex.format!("%l", :strftime),
      min:      date_time |> Timex.format!("%M", :strftime),
      sec:      date_time |> Timex.format!("%S", :strftime),
      meridian: date_time |> Timex.format!("%p", :strftime)
    }
  end



end
