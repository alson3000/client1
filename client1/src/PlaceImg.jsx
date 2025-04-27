// // // export default function PlaceImg({place,index=0,className=null}) {
// // //     if (!place.photos?.length) {
// // //         return '';
// // //     }

// // //     if (!className) {
// // //         className = 'object-cover';
// // //     }
// // //     return (
// // //             <img className="className" src={`http://localhost:5000/uploads/${place.photos[index]}`} alt=""/>
// // //     );
// // // }

// // // export default function PlaceImg({ place, index = 0, className = null }) {
// // //     if (!place.photos?.length) {
// // //       return (
// // //         <div className="w-full h-full bg-gray-200 flex items-center justify-center">
// // //           <span className="text-gray-500">No image available</span>
// // //         </div>
// // //       );
// // //     }
  
// // //     // Combine default 'object-cover' with custom className
// // //     const imgClassName = className ? `${className} object-cover` : "object-cover";
  
// // //     return (
// // //       <img
// // //         className={imgClassName}
// // //         src={`http://localhost:5000/uploads/${place.photos[index]}`}
// // //         alt={place.title || "Place image"}
// // //         onError={(e) => {
// // //           console.error(`Failed to load image: ${e.target.src}`);
// // //           e.target.style.display = "none"; // Hide broken image
// // //           e.target.parentElement.innerHTML =
// // //             '<div class="w-full h-full bg-gray-200 flex items-center justify-center"><span class="text-gray-500">No image available</span></div>';
// // //         }}
// // //       />
// // //     );
// // //   }


export default function PlaceImg({ place, index = 0, className = null }) {
    if (!place.photos?.length) {
      return (
        <div
          style={{ width: "100%", height: "100%", backgroundColor: "#e5e7eb" }}
          className="flex items-center justify-center"
        >
          <span className="text-gray-500">No image available</span>
        </div>
      );
    }
  
    // Combine default classes with custom className
    const imgClassName = className ? `${className} object-cover` : "object-cover";
  
    return (
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        <img
          className={imgClassName}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          src={`http://localhost:5000/uploads/${place.photos[index]}`}
          alt={place.title || "Place image"}
          onError={(e) => {
            console.error(`Failed to load image: ${e.target.src}`);
            e.target.style.display = "none"; // Hide broken image
            e.target.parentElement.innerHTML =
              '<div style="width:100%;height:100%;background-color:#e5e7eb" class="flex items-center justify-center"><span class="text-gray-500">No image available</span></div>';
          }}
        />
      </div>
    );
  }

// export default function PlaceImg({ place, index = 0, className = null }) {
//     if (!place.photos?.length) {
//       return (
//         <div
//           style={{
//             width: "100%",
//             height: "100%",
//             backgroundColor: "#e5e7eb",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <span className="text-gray-500">No image available</span>
//         </div>
//       );
//     }
  
//     // Combine default classes with custom className
//     const imgClassName = className ? `${className} object-cover` : "object-cover";
  
//     return (
//       <div
//         style={{
//           width: "100%",
//           height: "100%",
//           position: "relative",
//           padding: 0,
//           margin: 0,
//           overflow: "hidden",
//         }}
//       >
//         <img
//           className={imgClassName}
//           style={{
//             width: "100%",
//             height: "100%",
//             objectFit: "cover",
//             position: "absolute",
//             top: 0,
//             left: 0,
//             padding: 0,
//             margin: 0,
//             border: "none",
//           }}
//           src={`http://localhost:5000/uploads/${place.photos[index]}`}
//           alt={place.title || "Place image"}
//           onError={(e) => {
//             console.error(`Failed to load image: ${e.target.src}`);
//             e.target.style.display = "none";
//             e.target.parentElement.innerHTML =
//               '<div style="width:100%;height:100%;background-color:#e5e7eb;display:flex;align-items:center;justify-content:center"><span class="text-gray-500">No image available</span></div>';
//           }}
//         />
//       </div>
//     );
//   }


// export default function PlaceImg({ place, index = 0 }) {
//     if (!place.photos?.length) {
//       return (
//         <div
//           style={{
//             width: "100%",
//             height: "100%",
//             backgroundColor: "#e5e7eb",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <span className="text-gray-500">No image available</span>
//         </div>
//       );
//     }
  
//     return (
//       <div
//         style={{
//           width: "100%",
//           height: "100%",
//           backgroundImage: `url(http://localhost:5000/uploads/${place.photos[index]})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           padding: 0,
//           margin: 0,
//           overflow: "hidden",
//         }}
//         role="img"
//         aria-label={place.title || "Place image"}
//       ></div>
//     );
//   }