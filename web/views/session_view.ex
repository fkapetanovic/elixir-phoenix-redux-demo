defmodule Joggernaut.SessionView do
  use Joggernaut.Web, :view

  def render("show.json", %{jwt: jwt, user: user}) do
    %{
      jwt: jwt,
      user: user
    }
  end

  def render("error.json", %{message: message}) do
    %{error: message}
  end

  def render("delete.json", _) do
    %{ok: true}
  end

  def render("forbidden.json", %{error: error}) do
    %{error: error}
  end

  def render("unauthorized.json", %{error: error}) do
    %{error: error}
  end

  def render("not_found.json", %{error: error}) do
    %{error: error}
  end
end
