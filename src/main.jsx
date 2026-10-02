import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const products = [
  ['Aero Knit Runner','Sneakers',3499,2799,4.8,124,'/images/aero-knit-runner.jpg'],
  ['Metro Court Low','Sneakers',3299,2599,4.7,98,'/images/metro-court-low.jpg'],
  ['Terra Trail Pro','Sneakers',4299,3399,4.8,76,'/images/terra-trail-pro.jpg'],
  ['Noir Penny','Loafers',3999,3199,4.6,61,'/images/noir-penny.jpg'],
  ['Luna Soft Mule','Loafers',2899,2299,4.5,54,'/images/luna-soft-mule.jpg'],
  ['Regent Oxford','Formal',4499,3699,4.8,88,'/images/regent-oxford.jpg'],
  ['Verona Derby','Formal',4299,3499,4.7,73,'/images/verona-derby.jpg'],
  ['Harbor Chelsea','Boots',4999,3999,4.8,67,'/images/harbor-chelsea.jpg'],
  ['Ridge Lace Boot','Boots',5299,4199,4.6,42,'/images/ridge-lace-boot.jpg'],
  ['Siena Block Heel','Heels',3599,2899,4.7,91,'/images/siena-block-heel.jpg'],
  ['Aria Slingback','Heels',3199,2499,4.6,63,'/images/aria-slingback.jpg'],
  ['Palm Resort Slide','Sandals',1999,1499,4.5,117,'/images/palm-resort-slide.jpg'],
  ['Dune Cross Sandal','Sandals',2299,1799,4.6,82,'/images/dune-cross-sandal.jpg'],
  ['Cove Fisherman','Sandals',2599,1999,4.7,49,'/images/cove-fisherman.jpg'],
  ['Nova Slip-On','Casual',2799,2199,4.6,105,'/images/nova-slip-on.jpg'],
  ['Canvas 01','Casual',2499,1899,4.5,73,'/images/canvas-01.jpg'],
  ['Apex Knit Trainer','Sports',3999,3199,4.8,136,'/images/apex-knit-trainer.jpg'],
  ['Sprint Flex','Sports',3699,2899,4.7,112,'/images/sprint-flex.jpg'],
  ['Monaco Driving Shoe','Loafers',3799,2999,4.7,57,'/images/monaco-driving-shoe.jpg'],
  ['Eclipse High-Top','Sneakers',3899,3099,4.8,69,'/images/eclipse-high-top.jpg']
].map(([name,category,price,salePrice,rating,reviews,image],i)=>({
  id:i+1,name,category,price,salePrice,rating,reviews,image,
  sizes:[6,7,8,9,10],colors:['Black','White','Tan'],
  stock:i%7===0?4:18,description:`Premium ${category.toLowerCase()} footwear designed for everyday comfort and modern style.`
}));

const categories = ['All','Sneakers','Casual','Formal','Loafers','Sandals','Boots','Heels','Sports'];

function App(){
  const [category,setCategory]=useState('All');
  const [query,setQuery]=useState('');
  const [sort,setSort]=useState('featured');
  const [cart,setCart]=useState([]);
  const [wish,setWish]=useState([]);
  const [selected,setSelected]=useState(null);
  const [size,setSize]=useState(8);
  const [menu,setMenu]=useState(false);
  const [checkout,setCheckout]=useState(false);

  const visible=useMemo(()=>{
    let list=products.filter(p=>
      (category==='All'||p.category===category) &&
      `${p.name} ${p.category}`.toLowerCase().includes(query.toLowerCase())
    );
    if(sort==='low') list=[...list].sort((a,b)=>a.salePrice-b.salePrice);
    if(sort==='high') list=[...list].sort((a,b)=>b.salePrice-a.salePrice);
    if(sort==='rating') list=[...list].sort((a,b)=>b.rating-a.rating);
    return list;
  },[category,query,sort]);

  const addToCart=(p)=>{
    setCart(c=>{
      const existing=c.find(x=>x.id===p.id&&x.size===size);
      if(existing)return c.map(x=>x===existing?{...x,qty:x.qty+1}:x);
      return [...c,{...p,size,qty:1}];
    });
    setSelected(null);
  };

  const total=cart.reduce((s,p)=>s+p.salePrice*p.qty,0);

  return <div className="app">
    <div className="announce">FREE SHIPPING ON ORDERS ABOVE ₹1,999</div>
    <header>
      <button className="menuBtn" onClick={()=>setMenu(!menu)}>☰</button>
      <div className="logo">SOLEVIA</div>
      <nav className={menu?'open':''}>
        <button onClick={()=>{setCategory('All');setMenu(false)}}>Shop</button>
        <button onClick={()=>{setCategory('Sneakers');setMenu(false)}}>Sneakers</button>
        <button onClick={()=>{setCategory('Casual');setMenu(false)}}>Casual</button>
        <button onClick={()=>{setCategory('Formal');setMenu(false)}}>Formal</button>
        <button onClick={()=>{setCategory('Sandals');setMenu(false)}}>Sandals</button>
      </nav>
      <div className="actions">
        <input aria-label="Search products" placeholder="Search" value={query} onChange={e=>setQuery(e.target.value)}/>
        <button>♡ {wish.length}</button>
        <button onClick={()=>document.getElementById('cart').scrollIntoView({behavior:'smooth'})}>Bag ({cart.length})</button>
      </div>
    </header>

    <main>
      <section className="hero">
        <div>
          <span>NEW SEASON / 2026</span>
          <h1>Walk your<br/><em>own way.</em></h1>
          <p>Contemporary footwear built around comfort, confidence and everyday movement.</p>
          <button className="primary" onClick={()=>document.getElementById('shop').scrollIntoView({behavior:'smooth'})}>Shop collection</button>
        </div>
      </section>

      <section className="benefits">
        {['Free shipping over ₹1,999','Easy 7-day returns','Secure checkout','Designed for everyday comfort'].map(x=><div key={x}><strong>{x}</strong><span>Simple shopping, thoughtfully made.</span></div>)}
      </section>

      <section id="shop" className="section">
        <div className="sectionHead">
          <div><span className="eyebrow">THE EDIT</span><h2>Shop footwear</h2></div>
          <select value={sort} onChange={e=>setSort(e.target.value)}>
            <option value="featured">Featured</option><option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option><option value="rating">Top rated</option>
          </select>
        </div>
        <div className="chips">{categories.map(c=><button className={category===c?'active':''} onClick={()=>setCategory(c)} key={c}>{c}</button>)}</div>
        <div className="grid">{visible.map(p=><article className="card" key={p.id}>
          <div className="imageWrap"><img src={p.image} alt={p.name} onError={e=>{e.currentTarget.src='https://placehold.co/700x700/f4f0ea/222?text='+encodeURIComponent(p.name)}}/>
            <button className="heart" onClick={()=>setWish(w=>w.includes(p.id)?w.filter(id=>id!==p.id):[...w,p.id])}>{wish.includes(p.id)?'♥':'♡'}</button>
          </div>
          <div className="cardInfo"><span>{p.category}</span><h3>{p.name}</h3><p>₹{p.salePrice.toLocaleString('en-IN')} <del>₹{p.price.toLocaleString('en-IN')}</del></p>
          <button className="link" onClick={()=>setSelected(p)}>View product →</button></div>
        </article>)}</div>
      </section>

      <section className="story"><div><span className="eyebrow">THE SOLEVIA STORY</span><h2>Made to move<br/>with you.</h2><p>We design versatile footwear for city days, long walks and the moments between. Clean silhouettes meet practical comfort.</p></div></section>

      <section id="cart" className="cart section">
        <div className="sectionHead"><div><span className="eyebrow">YOUR BAG</span><h2>Cart</h2></div></div>
        {cart.length===0?<p className="empty">Your bag is empty.</p>:<>
          {cart.map((p,i)=><div className="cartRow" key={i}><img src={p.image} onError={e=>e.currentTarget.src='https://placehold.co/120x120/f4f0ea/222?text=shoe'} alt=""/><div><strong>{p.name}</strong><span>Size {p.size} · Qty {p.qty}</span></div><b>₹{(p.salePrice*p.qty).toLocaleString('en-IN')}</b></div>)}
          <div className="cartTotal"><strong>Total ₹{total.toLocaleString('en-IN')}</strong><button className="primary" onClick={()=>setCheckout(true)}>Checkout</button></div>
        </>}
      </section>
    </main>

    <footer><div className="logo">SOLEVIA</div><p>Original footwear. Everyday movement.</p><small>© 2026 Solevia. Demo storefront.</small></footer>

    {selected&&<div className="overlay" onClick={()=>setSelected(null)}><div className="modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setSelected(null)}>×</button><img src={selected.image} onError={e=>e.currentTarget.src='https://placehold.co/700x700/f4f0ea/222?text=shoe'} alt={selected.name}/><div><span>{selected.category}</span><h2>{selected.name}</h2><p>{selected.description}</p><h3>₹{selected.salePrice.toLocaleString('en-IN')} <del>₹{selected.price.toLocaleString('en-IN')}</del></h3><label>Size</label><div className="sizes">{selected.sizes.map(s=><button className={size===s?'selected':''} onClick={()=>setSize(s)} key={s}>{s}</button>)}</div><button className="primary wide" onClick={()=>addToCart(selected)}>Add to bag</button></div></div></div>}

    {checkout&&<div className="overlay" onClick={()=>setCheckout(false)}><div className="modal checkout" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setCheckout(false)}>×</button><span className="eyebrow">CHECKOUT</span><h2>Complete your order</h2><input placeholder="Full name"/><input placeholder="Phone number"/><input placeholder="Delivery address"/><select><option>Cash on Delivery</option><option>Online payment — connect provider</option></select><button className="primary wide" onClick={()=>{alert('Demo order placed. Connect a payment/order backend for production.');setCheckout(false)}}>Place demo order · ₹{total.toLocaleString('en-IN')}</button></div></div>}
  </div>
}
createRoot(document.getElementById('root')).render(<App/>);
