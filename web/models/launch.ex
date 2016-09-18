defmodule RocketLaunches.Launch do
  alias RocketLaunches.Data
  alias RocketLaunches.Mission
  alias RocketLaunches.Rocket
  alias RocketLaunches.Location
  alias RocketLaunches.Time


  def next_ten do
    { :ok, data } = Data.get "https://launchlibrary.net/1.1/launch/next/10"
    from(data)
    |> Enum.map(&(useful_data(&1)))
  end

  def all_today do
    next_ten
    |> Enum.filter(fn launch ->
         Time.is_today?(launch.windows.start) and
         !Time.passed?(launch.windows.end)
       end)
  end

  def from data do
    data["launches"]
  end

  def useful_data launch do
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
  end




end
