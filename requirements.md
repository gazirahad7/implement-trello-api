### Task 2: Implement a list using Trello API. You have to do some CRUD operations with trello api.

Trello is a project management tool, where anyone can handle his project’s tasks. When you login to trello,
you can create a Board. A Board means a Project. Then you can create a list there. You can assume a list
as a task category. Inside the list, you can add cards that will have information about a task or work.
You have to create something like trello of your own, using trello API (no need to implement all
trello features, just create basic operation mentioned below). We added some related documentation
links, just follow the documentation and implement it.

To implement this whole process with Trello API, you will have to first authorize the Application [step 1].
After authorization is complete, you have to get the organization id [step 1.1].
Steps:

#### 1. Authorization: Create an authorization page. You have to implement OAuth authorization to connect

with trello api. On this page, there will be a form, which will take apikey, api secret as input and an
authorization button.
doc-link: https://developer.atlassian.com/cloud/trello/guides/rest-api/authorization/#authorizing-a-client
1.1. you will have to get the organization id for future use.
doc-link:https://developer.atlassian.com/cloud/trello/rest/api-group-members/#api-members-id-organizations
-get
Note:
● To get organization, you will need a member id, for yourself use ‘me’ as a member id. It will get
self-profile information.
● If there is only one organization, then automatically the organization id will be selected and
stored in session.
● But if there is multiple organization, the first organization will be selected by default.

#### 2. list all boards – Create a page, all the boards of an organization will be listed here.

Doc-link:https://developer.atlassian.com/cloud/trello/rest/api-group-organizations/#api-organizations-id-boar
ds-get
2.1. create a board - a form will be available, which will take the board name & description
doc-link:https://developer.atlassian.com/cloud/trello/rest/api-group-boards/#api-board
s-post
2.2. update board
doc-link:https://developer.atlassian.com/cloud/trello/rest/api-group-boards/#api-boards-i
d-put
2.3. delete board
doc-link:https://developer.atlassian.com/cloud/trello/rest/api-group-boards/#api-boards-id-d
elete
2.4. view a board - on this page, selected board's all list will be listed here ( all list will
have a link, which will go to view a list page )
https://developer.atlassian.com/cloud/trello/rest/api-group-boards/#api-boards-id-lists-get

#### 3. view a list - Create a page, selected list's all cards will be listed here ( all card will have a link, which will

go to view a card page )
doc-link:https://developer.atlassian.com/cloud/trello/rest/api-group-lists/#api-lists-id-cards-get
3.1. create a list – a form which will take the list name as input

doc-link:https://developer.atlassian.com/cloud/trello/rest/api-group-lists/#api-lists-post

#### 4. view a card – Create a page, the card information will be listed here.

doc-link:https://developer.atlassian.com/cloud/trello/rest/api-group-cards/#api-cards-i
d-get
4.1. create a card – a form which will take the name, description
doc-link:https://developer.atlassian.com/cloud/trello/rest/api-group-cards/#api-cards-post

### Note:

● Follow the best coding practice you know so far (with any design pattern).
● Any backend framework or raw php acceptable.
● Show data in the front-end with an easy to use UI.
● You can use any frontend framework if needed. (we prefer “React”)
● Use SQL query or Query Builder or Eloquent for generating the report
