import React, { useEffect } from "react";
import data2 from "../data/data2";

function Area2Page() {
  useEffect(() => {
    let container = document.getElementById("map2");
    let options = {
      center: new window.kakao.maps.LatLng(37.520657, 127.02297),
      level: 5,
    };

    let map = new window.kakao.maps.Map(container, options);
    var imageSrc = require("../Image/marker-green.png");
    var imageSize = new window.kakao.maps.Size(30, 40);

    var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
    var markerList = [];
    var infowindowList = [];

    data2.forEach((item) => {
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(item.lat, item.lng),
        image: markerImage,
      });
      var content = `<div><a href="/">${item.name}</a></div>`;
      const infowindow = new window.kakao.maps.InfoWindow({
        content: content,
      });

      markerList.push(marker);
      infowindowList.push(infowindow);

      //   window.kakao.maps.event.addListener(
      //     marker,
      //     'click',
      //     makeOverListener(map, marker, infowindow),
      //   );
      //   window.kakao.maps.event.addListener(
      //     marker,
      //     'dragstart',
      //     makeOutListener(infowindow),
      //   );
    });

    // function makeOverListener(map, marker, infowindow) {
    //   return function () {
    //     infowindow.open(map, marker);
    //   };
    // }
    // function makeOutListener(infowindow) {
    //   return function () {
    //     infowindow.close();
    //   };
    // }
    for (var i = 0, ii = markerList.length; i < ii; i++) {
      window.kakao.maps.event.addListener(map, "click", ClickMap(i));
      window.kakao.maps.event.addListener(
        markerList[i],
        "click",
        getClickHandler(i)
      );
    }

    function ClickMap(i) {
      return function () {
        var infowindow = infowindowList[i];
        infowindow.close();
      };
    }

    function getClickHandler(i) {
      return function () {
        var marker = markerList[i];
        var infowindow = infowindowList[i];
        if (infowindow.getMap()) {
          infowindow.close();
        } else {
          infowindow.open(map, marker);
        }
      };
    }
  }, []);
  return (
    <>
      <div className="maptabs">
        <div id="map2" style={{ width: "100%", height: "400px" }} />
      </div>
    </>
  );
}

export default Area2Page;
