defmodule RocketLaunches.Launch do
  alias RocketLaunches.Data
  alias RocketLaunches.Mission
  alias RocketLaunches.Rocket
  alias RocketLaunches.Location


  def next_ten do
    { :ok, data } = Data.get "https://launchlibrary.net/1.1/launch/next/10"
    from(data)
    |> Enum.map(&(useful_data(&1)))
  end

  def all_today do
    today = Data.today
    next_ten
    |> Enum.filter(fn (launch) ->
        Map.delete(launch.windows.start, :time) == Map.delete(today, :time)
       end)
    |> IO.inspect
  end

  def from data do
    data["launches"]
  end

  def useful_data launch do
    IO.inspect launch
    %{
      rocket: Rocket.for(launch),
      location: Location.for(launch),
      missions: Mission.all_for(launch),
      windows: windows_for(launch),
    }
  end

  def windows_for launch do
     %{
       start: parse_date_for(launch["windowstart"]),
       end: parse_date_for(launch["windowend"])
     }
  end


  def parse_date_for window do
    Timex.parse!(window, "%B %e, %G %T %Z", :strftime)
    |> Data.parsed_date_time
  end




end
