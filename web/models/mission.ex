defmodule RocketLaunches.Mission do
  alias RocketLaunches.Mission

  def all_for launch do
     launch["missions"]
     |> Enum.map(&(&1["name"]))
  end

end
