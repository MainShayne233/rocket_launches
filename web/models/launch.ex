defmodule RocketLaunches.Launch do
  alias RocketLaunches.Data

  def next_launches do
    { :ok, data } = "https://launchlibrary.net/1.1/launch/next/10"
                    |> Data.get

    launches = from(data)
    |> Enum.each(&(IO.inspect windows(&1)))
  end

  def from data do
    data["launches"]
  end

  def windows launch do
     %{
       window_start: launch["windowstart"],
       window_end: launch["windowend"]
     }
  end


end
