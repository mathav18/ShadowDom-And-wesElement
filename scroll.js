let topScroll;
let rowHeig;
let buff;
let staticHeight=80;


class virutuvalScroller {
	constructor({
		element,
		height,
		rowHeight,
		pageSize,
	
	
		loadMore
	}) {

		this.scroller = element;
		this.height = typeof height === 'string' ? height : '80vh';
		this.rowHeight = rowHeight;
		this.pageSize = pageSize;

		this.data = [];
		this.loadMore = loadMore
		this.topHiddenElementCount = 0;



		const contentBox = document.createElement('div');
		this.contentBox = contentBox;
		this.scroller.append(contentBox);
		this.scroller.style.height = this.height;
		this.loadData();
		this.scroller.addEventListener('scroll', (this.handleScroller.bind(this)));




	}

	#topHiddenCount = 0;
	#bottomHiddenCount = 0;
	#scrollTop = 0;
	#paddingTop = 0;
	#paddingBottom = 0;
	#lastVisibleItemIndex = 0;



	loadData() {
		const scrollerObj = this.scroller.getBoundingClientRect();
		const minCount = Math.ceil(scrollerObj.height / this.rowHeight);
  	const page = Math.ceil(minCount / this.pageSize);
		const newData = this.loadMore(page * this.pageSize);
		this.data.push(...newData)
		this.renderNewItem(newData)
	}

	renderRow(n) {
	
		const row = document.createElement('div');
    row.className='row'
		row.dataset.index = `${n} box`;
    row.innerText=`Box Number ${n}`
		row.style.height = this.rowHeight;

		return row;
	}



	renderNewItem(newData) {
		newData.forEach(n => {
			this.contentBox.append(this.renderRow(n))
		});
	}







	handleScroller(e) {
		const { clientHeight, scrollHeight,	scrollTop } = e.target;


		if ((scrollHeight - (clientHeight + scrollTop)) < 100) {
			const newData = this.loadMore(this.pageSize);
			this.data.push(...newData);
		}

		const direction = scrollTop > this.#scrollTop ? 1 : -1;
		this.topELementScroll(direction);
		this.bottomElementScroll(direction)
		this.#scrollTop = scrollTop
	}



	topELementScroll(direction) {

		const { scrollTop } = this.scroller;
		const fstVisibleElment = Math.floor(scrollTop / this.rowHeight);
		const fstHideElement = Math.max(0, fstVisibleElment);
		const rows = this.contentBox.children;
   
		if (direction === 1) {
			for (let i = this.#topHiddenCount; i < fstHideElement; i++) {
				if (rows[0]) rows[0].remove();
			}
		}

		if (direction === -1) {
			for (let i = this.#topHiddenCount-1; i >= fstHideElement; i--) {
				const item = this.data[i];
				const elem = this.renderRow(item);
				this.contentBox.prepend(elem)
			}
		}

		this.#topHiddenCount = fstHideElement;
		this.#paddingTop = this.#topHiddenCount * this.rowHeight;
		this.contentBox.style.paddingTop = `${this.#paddingTop}px`
	}



	bottomElementScroll(direction) {
		const { scrollTop, clientHeight } = this.scroller;
		const lastVisibleELementIndex = Math.floor((scrollTop + clientHeight) / this.rowHeight);
   
		const lastHideElement = lastVisibleELementIndex;
		this.#lastVisibleItemIndex = lastVisibleELementIndex;
		const rows = [...this.contentBox.children];

		if (direction === -1) {
     
			for (let i = lastHideElement; i <= this.data.length; i++) {
				const ele = rows[i - this.#topHiddenCount];
				if (ele) ele.remove();
			}
		}

		if (direction === 1) {
      
			for (let i = this.#topHiddenCount + rows.length; i <= lastHideElement; i++) {
        
				const item = this.data[i];
				if (!item) break;
				const row = this.renderRow(item);
				this.contentBox.append(row);
			}
		}
	}
}


var host = document.querySelector('.shadowHost');
const scro = new virutuvalScroller({
	element: host,
	height: '100vh',
	rowHeight: 60,
	pageSize: 10,
	loadMore: function(pageSize) {
		const data = [];
		for (let i = 0; i < pageSize; i++) {
			let n = `${this.data.length+i}`
			data.push(n)
		}
		return data;
	}
})





