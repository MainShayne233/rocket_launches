defmodule RocketLaunches.Time do
  use Timex

  def today do
    Timex.now
  end

  def is_today? date_time do
    date_time
    |> same_day?(today)
  end

  def passed? date_time do
    IO.inspect Timex.to_gregorian_seconds(date_time)
    IO.inspect Timex.to_gregorian_seconds(today)
    Timex.to_gregorian_seconds(date_time) - Timex.to_gregorian_seconds(today) < 0
    |> IO.inspect
  end

  def same_day? date_1, date_2 do
    [date_1, date_2]
    |> Enum.map(&(Timex.day(&1)))
    |> Enum.uniq
    |> Enum.count == 1
  end

  def for_time_zone date_time, time_zone do
    date_time
    |> Timezone.convert(time_zone)
  end

  def zones_where_is_ten do
    Timex.timezones
    |> Enum.filter(fn time_zone ->
         Timex.now(time_zone)
         |> Timex.format!("%H", :strftime) == "10"
       end)
  end

  def formatted_time time, time_zone do
    time
    |> Timezone.convert(time_zone)
    |> Timex.format!("%l:%M:%S %p", :strftime)
    |> String.trim
  end

end
