const assert = require('assert');
const rimraf = require('rimraf');
const SimpleDb = require('../lib/simple-db');

const TEST_DIR = './test/testDir';

const db = new SimpleDb(TEST_DIR);

describe('simple database', () => {

    before(done => {
        rimraf(TEST_DIR, err => {
            done(err);
        });
    });

    it('returns empty array on no data', done => {
        db.getAll('cats', (err, cats) => {
            if(err) return done(err);
            assert.deepEqual(cats, []);
            done();
        });
    });

    const tom = { name: 'Tom', type: 'grey tabby' };
    const garfield = { name: 'Garfield', type: 'orange tabby' };
    const felix = { name: 'Felix', type: 'tuxedo' };

    function saveCat(catToSave, callback) {
        db.save('cats', catToSave, (err, cat) => {
            if(err) return callback(err);
            assert.ok(cat._id);
            catToSave._id = cat._id;
            callback(null, cat);
        });       
    }

    it('saves', done => {
        saveCat(tom, (err, cat) => {
            db.get('cats', cat._id, (err, gotCat) => {
                if(err) return done(err);
                assert.deepEqual(gotCat, tom);
                done();
            });
        });
    });



});