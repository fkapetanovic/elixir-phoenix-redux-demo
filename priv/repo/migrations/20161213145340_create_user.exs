defmodule Joggernaut.Repo.Migrations.CreateUser do
  use Ecto.Migration
  #mix phoenix.gen.model User users first_name:string last_name:string email:string encrypted_password:string role:string
  def change do
    create table(:users) do
      add :first_name, :string, null: false
      add :last_name, :string, null: false
      add :email, :string, null: false
      add :encrypted_password, :string, null: false
      add :role, :string, null: false, default: "regular"

      timestamps()
    end
    create unique_index(:users, [:email])
  end
end
