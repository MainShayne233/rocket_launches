defmodule RocketLaunches.Notification do
  alias RocketLaunches.Subscription
  alias RocketLaunches.Repo
  alias RocketLaunches.Time
  alias RocketLaunches.Launch

  def message launch, time_zone do
    "The #{launch.rocket} is launching today!\n" <>
    "The launch will be from #{launch.location.name}, " <>
    "and is for #{launch.missions |> Enum.join(", ")}.\n" <>
    "The launch window starts at " <>
    "#{Time.formatted_time(launch.windows.start, time_zone)} " <>
    "and ends at " <>
    "#{Time.formatted_time(launch.windows.end, time_zone)}"
  end

  def send_notifications do
    Launch.all_today
    |> Enum.each(fn launch ->
      Subscription.interested_in(launch)
      |> Enum.each(fn sub ->
        ExTwilio.Message.create to: sub.phone_number,
                                from: "18442422517",
                                body: message launch, sub.time_zone
      end)
    end)
  end


end
