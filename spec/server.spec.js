const request = require('request')
describe('calc', ()=>{
    it("should be result to 4", ()=>{
        expect(2*2).toBe(4)
    })
})

describe("get message", ()=>{
    it("should get 200 Ok", (done)=>{
        request.get('http://localhost:3000/message',(err, res, body)=>{
            done();
            expect(res.statusCode).toBe(200)
        })
    })
    it("should return a list, thats not empty", (done)=>{
        request.get('http://localhost:3000/message',(err, res, body)=>{
            done();
            expect(JSON.parse(res.body).length).toBeGreaterThan(0);
        })
    })
})
describe("get user by name", ()=>{
    it("should return the payload with the user",(done)=>{
        request.get('http://localhost:3000/message/Charity',(err,res)=>{
            done();
            expect(res.statusCode).toEqual(200)
        })
    })
    it("it should return Charity", (done)=>{
        request.get('http://localhost:3000/message/Charity',(err,res)=>{
            done();
            expect(JSON.parse(res.body)[0].name).toBe("Charity");
    })
  })
})