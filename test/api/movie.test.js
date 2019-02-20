const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);
let token, movieId;

describe('/api/movies tests', () => {
    before((done) => {
        chai.request(server)
        .post('/auth')
        .send({ username: "test", password: "123456"})
        .end((err, res)=>{
            token = res.body.token;
            done();
        });
    });
    describe('/GET movies', () => {
        it('it should GET all the movies', (done)=>{
            chai.request(server)
            .get('/api/movies')
            .set('x-access-token', token)
            .end((err, res)=>{
                res.should.have.status(200)
                res.body.should.be.a('array');
                done();
            });
        });
    });
    describe('/POST movie', () => {
        it('it should POST a movie', (done)=>{
            const movie = {
                title: 'Test',
                director_id: '5c6caf8582039e1c183c7f97',
                category: 'Komedi',
                country: 'Turkey',
                year: 1950,
                imdb_score: 10
            }
            chai.request(server)
            .post('/api/movies')
            .send(movie)
            .set('x-access-token', token)
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('director_id');
                res.body.should.have.property('category');
                res.body.should.have.property('country');
                res.body.should.have.property('year');
                res.body.should.have.property('imdb_score');
                movieId = res.body._id;
                done();
            });
        });
    });
    describe('/GET/:director_id movie', () => {
        it('it should GET a movie by the given id', (done)=>{
            chai.request(server)
            .get('/api/movies/'+ movieId)
            .set('x-access-token', token)
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('director_id');
                res.body.should.have.property('category');
                res.body.should.have.property('country');
                res.body.should.have.property('year');
                res.body.should.have.property('_id').eql(movieId);
                done();

            });
        });
    });


});