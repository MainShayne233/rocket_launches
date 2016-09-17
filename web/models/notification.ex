defmodule RocketLaunches.Notification do
  alias RocketLaunches.Subscription
  alias RocketLaunches.Repo

  def message launch do
    "The #{launch.rocket} is launching today!\n" <>
    "This launch is for #{launch.missions |> Enum.join(", ")}\n" <>
    "Launch window starts at #{formatted_time(launch.windows.start)} " <>
    "and ends at #{formatted_time(launch.windows.end)}"
  end

  def formatted_time time do
    IO.inspect time
    "#{time.hour}:#{time.min}:#{time.sec} #{time.meridian}"
  end


end
