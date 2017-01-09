defimpl Canada.Can, for: Joggernaut.User do
  alias Joggernaut.{User}

  def can?(%User{role: role}, action, User)
    when action in [:index, :create] do
      Enum.member?(["admin", "user_manager"], role)
  end

  def can?(%User{role: role}, _, %User{}) do
    Enum.member?(["admin", "user_manager"], role)
  end

  def can?(%User{}, _, nil) do
    false
  end

  def can?(%User{id: _, role: _}, action, _)
    when action in [:update, :delete] do
      true
  end
end
