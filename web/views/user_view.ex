defmodule Joggernaut.UserView do
  use Joggernaut.Web, :view

  def render("index.json", %{users: users}) do
    %{
      users: users
    }
  end

  def render("show.json", %{user: user}) do
    %{
      user: user
    }
  end
end
