class CircularQueue {
  constructor(size) {
    this.size = size;
    this.oldest = 0;
    this.newest = -1;
    this.queue = new Array(size).fill(null)
  }

  getNext(arg) {
    return (arg + 1) % this.size;
  } 

  enqueue(element) {
    let next = this.getNext(this.newest); 

    if (this.queue[next] !== null) {
      this.oldest = this.getNext(this.oldest);
    }

    this.queue[next] = element; 
    this.newest = next;
  }

  dequeue() {
    if (this.queue.every(e => e === null)) return null;
    let ret = this.queue[this.oldest]; 

    this.queue[this.oldest] = null;
    this.oldest = this.getNext(this.oldest);
   
    return ret;
  }
}

let queue = new CircularQueue(3);
console.log(queue.dequeue() === null);

queue.enqueue(1);
queue.enqueue(2);
console.log(queue.dequeue() === 1);

queue.enqueue(3);
queue.enqueue(4);
console.log(queue.dequeue() === 2);

queue.enqueue(5);
queue.enqueue(6);
queue.enqueue(7);
//console.log(queue);
console.log(queue.dequeue() === 5);
//console.log(queue);
console.log(queue.dequeue() === 6);
console.log(queue.dequeue() === 7);
console.log(queue.dequeue() === null);

let anotherQueue = new CircularQueue(4);
console.log(anotherQueue.dequeue() === null);

anotherQueue.enqueue(1)
anotherQueue.enqueue(2)
console.log(anotherQueue.dequeue() === 1);

anotherQueue.enqueue(3)
anotherQueue.enqueue(4)
console.log(anotherQueue.dequeue() === 2);

anotherQueue.enqueue(5)
anotherQueue.enqueue(6)
anotherQueue.enqueue(7)
console.log(anotherQueue.dequeue() === 4);
console.log(anotherQueue.dequeue() === 5);
console.log(anotherQueue.dequeue() === 6);
console.log(anotherQueue.dequeue() === 7);
console.log(anotherQueue.dequeue() === null);
