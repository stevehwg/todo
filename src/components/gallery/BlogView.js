import React from 'react';
import parse from 'html-react-parser';
// import PhotoList from './PhotoList';

// display a list of photos
const BlogView = (props) => {
  // get the id from params or pass it down from AlbumList.
  // console.log(props.match.params.id)
  console.log(props)
  return(
    <div className="row">
      {parse(`<p>It&#39;s been almost a month since I&#39;m back from Seattle.</p>

<p>One thing I&#39;ve been postponing to write about my trip was because I want to host the pictures I uploaded in my app instead of ultilizing&nbsp;Google Photos. It&#39;s a great service but it&#39;s a hassle for me to share pictures and get the link to insert pictures here. There are just too many steps. Implementing photo album feature on my site will allow me to streamline the process.</p>

<p>It&#39;s almost done and and the album sneak peak below :)</p>

<p><img alt="" class="img-responsive" src="https://lh3.googleusercontent.com/jVW-gpefr0xgzOFiMRaNgY3oHM-KEPtxuVI5qOd67ksFAfP0V8WLOdMq9jc4IHZsM1ANfwZrzcL01LI81BKzoZaXGrZiMSemVXTrQr98mIi6PuqPq1_wreVG4PjYLQI_c5yNFLr9u5SJx7I-6-sCyrLL7tWZeCKgWvXisagMTNhga1IUsB8DsBVXfW2kS13CAvYY9E2bUCKTPCiz0aCpxq3OZq6C0FWxcxyJNEAjuUOSgdLpmsiyeW_WFwG4ioRjb2fz6PJRjhp0oSMjxUMeL9rEifHzAcwI_AeCZS7ydeiDQ67YVJ3jasgjDOp8sDHmfAQDOm1bcXVGx4DSq_HhOf1eG3BR9lPfjm3b7_v_Y5w7uGZRT-Hxy7VZgwGyex3xqI-FihNq5yqH-nnQstLgEckWSbsX_2yHQoFKzwv971s0etezTJMyVmyO9BTeFsKfuyHseZMFLaMB8eujVIjBpz96SstujUPgYC-xMzyI9kARNOKhTbqgJBtz0_7uvCNqWWMvb_FNdfLvQY-CmFZ57dVjuGr78UI3CpSb5u452Us9vEfPgF59S-bdvCcVvERC1NOIcmG5CLVvBK14yjZKbgAbEtY1RdhxH8x8b0weGgcUDrcv95dCr2iFer8j9TDMCzapW3gr9nHxlVT2DTCZV6pvm5UhGkXubMw=w346-h614-no" />&nbsp;</p>
`)}
    </div>
  )
}

export default BlogView;
