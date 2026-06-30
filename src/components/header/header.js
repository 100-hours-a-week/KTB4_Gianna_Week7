import { getUserId } from "../../module/module.js";

export const loadHeader = async () => {
    try {
        const response = await fetch('/src/components/header/header.html');

        if (!response.ok) {
            throw new Error('헤더를 불러오지 못했습니다.');
        }

        const headerHtml = await response.text();
        const headerContainer = document.getElementById('headerContainer');
        headerContainer.innerHTML = headerHtml;
    } catch (error) {
        console.error('헤더 로딩 중 오류 발생:', error);
    } finally {
        const profileToggleBtn = document.getElementById("profileToggleBtn");
        const profileImage = document.getElementById("headerProfilePicture");
        const mypageToggleContainer = document.querySelector(".mypage-toggle-container");
        const backBtn = document.getElementById("backBtn");
        const logoutItem = document.getElementById("logoutItem");

        setProfileImage(profileImage);

        backBtn?.addEventListener('click', () => {
            history.back();
        });

        profileToggleBtn?.addEventListener('click', () => {
            if (mypageToggleContainer) {
                mypageToggleContainer.hidden = !mypageToggleContainer.hidden;
            }
        });

        logoutItem?.addEventListener('click', () => {
            if (window.confirm("로그아웃 하시겠습니까?")) {
                window.location.href = "../../login/login.html";
            } 
        });
    }
};

const setProfileImage = async (profileImage) => {
    if (!profileImage) {
        return;
    }

    const storedProfileImage = localStorage.getItem("profilePicture") || localStorage.getItem("profileImage");
    if (storedProfileImage) {
        profileImage.src = storedProfileImage;
        return;
    }

    try {
        if (!window.cookieStore) {
            return;
        }

        const userIdCookie = await getUserId();
        if (!userIdCookie) {
            return;
        }

        const response = await fetch(`http://localhost:8080/users/${userIdCookie}/profilePicture`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            return;
        }

        const data = await response.json();
        const profilePictureData = data?.data?.profilePicture;
        

        if (profilePictureData) {
            profileImage.src = profilePictureData;
            localStorage.setItem("profilePicture", profilePictureData);
        }
    } catch (error) {
        console.error("프로필 이미지 로딩 중 오류 발생:", error);
    }
};
