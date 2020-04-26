# Covid19MM

Hospital information and News information REST endpoint

## API Endpoints

### `POST` /admin/login

Login admin account and get `token`

- parameters
	- `email` - email of admin account
	- `password` - password of admin account
- returns
	- `code`
		- 200 - if successfully authenticated
		- 403 - if invalid email or password
	- `token`
		- access token to be used for futher requests
		- return **only** if `code` is **200**
	- `error`
		- error message for authentication
		- return if `code` is **not 403**

### `POST` /admin/register

Register admin account and get `token`

- parameters
	- `email` - email of admin account
	- `password` - password of admin account
	- `key` - secret key for registration
- returns
	- `code`
		- 201 - if admin is successfully created
		- 422 - if email is **already registered**
	- `token`
		- access token to be used for futher requests
		- return **only** if `code` is **201**
	- `error`
		- error message for authentication
		- return if `code` is **not 201**

### `GET` /admin/collections

Get **all available collections** from `mongodb` except `admin` collection
- parameters
	- `token` - admin access token exchanged by **logging in** or **registering**
- returns
	- `code` 
		- 200 if no error
		- 403 if invalid `token`
	- `data`
		- array of collection name
		- return **only** if `code` is **200**
	- `error`
		- error message for operations
		- return if `code` is not **200**

### `POST` /admin/upload

Upload files (*.csv) for data preparation

- parameters
	- `token` - access token exchanged by **logging in** or **registering**
	- `file-to-upload` file data stream to be uploaded (`multipart-formdata`)
- returns
	- `code`
		- 201 if no error
		- 403 if invalid `token`
	- `status`
		- return **success** if `code` is **201**

### `GET` /generate/data/prepare

Prepare uploaded data

- parameters
	- `token` - access token exchanged by **logging in** or **registering**
- returns
	- `code`
		- 201 if no error
		- 403 if invalid `token`
	- `status`
		- return **success** if `code` is **201**
	- `message`
		- additional message for operation
		- optionally returned

### `GET` /generate/data/prepare

Prepare uploaded data

- parameters
	- `token` - access token exchanged by **logging in** or **registering**
- returns
	- `code`
		- 201 if no error
		- 403 if invalid `token`
	- `status`
		- return **success** if `code` is **201**
	- `message`
		- additional message for operation
		- optionally returned

### `GET` /generate/data/load

Load prepared data

- parameters
	- `token` - access token exchanged by **logging in** or **registering**
- returns
	- `code`
		- 201 if no error
		- 403 if invalid `token`
	- `status`
		- return **success** if `code` is **201**
	- `message`
		- additional message for operation
		- optionally returned

### `GET` /generate/model/create

Create model files for future routes

- parameters
	- `token` - access token exchanged by **logging in** or **registering**
- returns
	- `code`
		- 201 if no error
		- 403 if invalid `token`
	- `status`
		- return **success** if `code` is **201**
	- `message`
		- additional message for operation
		- optionally returned

### `GET` /generate/model/load

Load created models into application

- parameters
	- `token` - access token exchanged by **logging in** or **registering**
- returns
	- `code`
		- 201 if no error
		- 403 if invalid `token`
	- `status`
		- return **success** if `code` is **201**
	- `message`
		- additional message for operation
		- optionally returned

### `GET` /generate/route/create

Create routes files for uploaded data API REST endpoint

- parameters
	- `token` - access token exchanged by **logging in** or **registering**
- returns
	- `code`
		- 201 if no error
		- 403 if invalid `token`
	- `status`
		- return **success** if `code` is **201**
	- `message`
		- additional message for operation
		- optionally returned

### `GET` /generate/route/load

Load create routes for REST endpoints

- parameters
	- `token` - access token exchanged by **logging in** or **registering**
- returns
	- `code`
		- 201 if no error
		- 403 if invalid `token`
	- `status`
		- return **success** if `code` is **201**
	- `message`
		- additional message for operation
		- optionally returned

