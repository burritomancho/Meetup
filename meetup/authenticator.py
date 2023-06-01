import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.user import UserRepo, UserOut, UserOutWithPassword


class ExampleAuthenticator(Authenticator):
    async def get_account_data(
        self,
        email: str,
        repo: UserRepo,
    ):
        return repo.get_one_user(email)

    def get_account_getter(
        self,
        accounts: UserRepo = Depends(),
    ):
        return accounts

    def get_hashed_password(self, account: UserOutWithPassword):
        return account.hashed_password

    def get_account_data_for_cookie(self, account: UserOut):
        return account.email, UserOut(**account.dict())


authenticator = ExampleAuthenticator(os.environ["SIGNING_KEY"])
