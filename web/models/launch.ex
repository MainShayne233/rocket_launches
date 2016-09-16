defmodule RocketLaunches.Launch do
  alias RocketLaunches.Data
  alias RocketLaunches.Mission
  alias RocketLaunches.Rocket

  def next_ten do
    { :ok, data } = "https://launchlibrary.net/1.1/launch/next/10"
                    |> Data.get

    from(data)
    |> Enum.map(&(useful_data(&1)))
    |> IO.inspect
  end

  def all_today do
    next_ten
  end

  def from data do
    data["launches"]
  end

  def useful_data launch do
    %{
      rocket:   Rocket.for(launch),
      missions: Mission.all_for(launch),
      windows: windows_for(launch)
    }
  end

  def windows_for launch do
     %{
       start: parse_date_for(launch["windowstart"]),
       end: launch["windowend"]
     }
  end


  def parse_date_for window do
    [month, day, year, time, zone] = String.split(window, " ")
    |> IO.inspect
  end


end
