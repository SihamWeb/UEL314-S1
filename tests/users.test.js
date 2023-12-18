const request = require('supertest');
const app = require('../index');
const models = require('../models');
const usersCtrl = require('../controllers/usersController');
const sinon = require('sinon');

// Test Create an user
describe('Test : Create an user - Params ok', function() {
  test('* Json response - status : 200', function(done) {
    const reqBody = {firstname: 'TF', lastname: 'TL' };
 
    request(app)
      .post('/api/createUser')
      .send(reqBody)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
}),

describe('Test : Create an user - No params', function() {
  test('* Json response - status : 400', function(done) {
    const reqBody = {firstname: '', lastname: '' };
 
    request(app)
      .post('/api/createUser')
      .send(reqBody)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done);
  });
}),

// Test Get All Users
describe('Test : Get all users', function() {
  test('* Json response - status : 200', function(done) {
    request(app)
      .get('/api/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
}),

// Test Get An User By Id
describe('Test : Get an user by id - Id ok in bdd', () => {
    test('* Json response - status : 200', () => {
        return request(app)
            .get('/api/user/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).toHaveProperty('id', 1);
            });
    });
}),

describe('Test : Get an user by id - No id in bdd', () => {
    test('* Json response - status : 404', async () => {
        await request(app)
            .get('/api/user/1000')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404);
    });
}),

// Test Update an user
describe('Test : Update an user - No param id', function() {
  test('* Json response - status : 400', function(done) {
    const reqBody = {id: '', firstname: 'Amel', lastname: 'T6' };
 
    request(app)
      .put('/api/updateUser')
      .send(reqBody)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done);
  });
}),

describe('Test : Update an user - No param lastname or firstname', function() {
  test('* Json response - status : 400', function(done) {
    const reqBody = {id: '1', firstname: '', lastname: '' };
 
    request(app)
      .put('/api/updateUser')
      .send(reqBody)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done);
  });
}),

describe('Test : Update an user - id not found in bdd', function() {
  test('* Json response - status : 404', async () => {
    const reqBody = { id: '1000', firstname: 'Dounia', lastname: '' };

    await request(app)
      .put('/api/updateUser')
      .send(reqBody)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404);
  });
}),

describe('Test : Update an user - params ok and id in bdd ok', function() {
  test('* Json response - status : 200', async () => {
    const reqBody = { id: '1', firstname: '', lastname: 'Paille' };

    await request(app)
      .put('/api/updateUser')
      .send(reqBody)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
}),

// Test Delete an user
describe('Test: Create and Delete an user - params ok', () => {
  let createdUser;

  beforeEach(async () => {
    const response = await request(app)
      .post('/api/createUser')
      .send({
        firstname: 'Test',
        lastname: 'Jest',
      })
      .expect(200);
    
    createdUser = response.body
  });

  test('Json response - status : 200', async () => {
     const responseDelete = await request(app)
      .delete(`/api/deleteUser/${createdUser.user.id}`)
      .set('Accept', 'application/json')
      .expect(200);

    expect(responseDelete.body)
    .toEqual({ success: 'Utilisateur supprimé avec succès' });
  });
}),

describe('Test: Delete an user - id forbidden to delete', () => {
    test('Json response - status : 403', async () => {
        const idUser = 1;
        const responseDelete = await request(app)
            .delete(`/api/deleteUser/${idUser}`)
            .set('Accept', 'application/json')
            .expect(403);

        expect(responseDelete.body)
        .toEqual({ error: 'Vous n\'êtes pas autorisé à supprimé cet utilisateur' });
  });
}),

describe('Test: Delete an user - id not found in bdd', () => {
  test('Json response - status : 404', async () => {
    const responseDelete = await request(app)
      .delete(`/api/deleteUser/12000`)
      .set('Accept', 'application/json')
      .expect(404);

    expect(responseDelete.body)
      .toEqual({ error: 'Aucun utilisateur trouvé' });
  });
})
