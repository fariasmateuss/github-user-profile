import React, { useEffect, useState } from 'react';

import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillYoutube,
  AiFillMediumSquare,
  AiFillTwitterSquare,
} from 'react-icons/ai';
import { SiDevDotTo } from 'react-icons/si';
import { MdPhotoCamera } from 'react-icons/md';
import { TiLocationArrow } from 'react-icons/ti';
import { HiOutlineMail } from 'react-icons/hi';

import api from '../../services/api';

import './styles.css';

interface IProfile {
  avatar_url: string;
  name: string;
  login: string;
  bio: string;
  location: string;
  public_repos: number;
  followers: number;
  following: number;
}

const Card: React.FC = () => {
  const [user, setUser] = useState<IProfile | null>();

  useEffect(() => {
    async function fetchProfileData(): Promise<void> {
      const { data } = await api.get<IProfile>('/users/fariasmateuss');

      setUser(data);
    }

    fetchProfileData();
  }, []);

  const image: HTMLElement | any = document.querySelector('.image');
  const hover: HTMLElement | any = document.querySelector('.hover');
  const modal: HTMLElement | any = document.querySelector('.modal');
  const close: HTMLElement | any = document.querySelector('.close');

  if (image || close) {
    image.addEventListener('click', () => {
      hover.classList.add('active');
      modal.classList.add('show');
    });

    close.addEventListener('click', () => {
      hover.classList.remove('active');
      modal.classList.remove('show');
    });
  }

  return (
    <main>
      <div className="modal">
        <img src={user?.avatar_url} alt="" />
        <div className="close" />
      </div>

      <div className="container">
        <div className="card">
          <div className="header">
            <div className="hamburger-menu">
              <div className="center" />
            </div>
            <a href="mailto:mateus_vinicius15@outlook.com" className="mail">
              <HiOutlineMail size={30} />
            </a>
            <div className="main">
              <div className="image">
                <img
                  className="avatar"
                  src={user?.avatar_url}
                  alt={user?.name}
                />
                <div className="hover">
                  <MdPhotoCamera size={36} />
                </div>
              </div>
              <h3 className="name">{user?.name}</h3>
              <h3 className="sub-location">
                <span className="icon-location">
                  <TiLocationArrow />
                </span>
                {user?.location}
              </h3>
            </div>
          </div>

          <div className="content">
            <div className="left">
              <div className="about-container">
                <h3 className="title">About</h3>
                <p className="text">{user?.bio}</p>
              </div>

              <div className="icons-container">
                <a
                  href="https://github.com/fariasmateuss/"
                  target="blank"
                  className="icon"
                >
                  <AiFillGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/fariasmateuss/"
                  target="blank"
                  className="icon"
                >
                  <AiFillLinkedin />
                </a>
                <a
                  href="https://medium.com/@fariasmateuss"
                  target="blank"
                  className="icon"
                >
                  <AiFillMediumSquare />
                </a>
                <a
                  href="https://twitter.com/fariasmateuss"
                  target="blank"
                  className="icon"
                >
                  <AiFillTwitterSquare />
                </a>
                <a
                  href="https://dev.to/fariasmateuss"
                  target="blank"
                  className="icon"
                >
                  <SiDevDotTo />
                </a>
                <a
                  href="https://www.youtube.com/channel/UC2dD4ZlE8zuMoVGOP3jdB8g?sub_confirmation=1"
                  target="blank"
                  className="icon"
                >
                  <AiFillYoutube />
                </a>
              </div>

              <div className="buttons-wrap">
                <div className="first-wrap">
                  <a
                    href="mailto:mateus_vinicius15@outlook.com"
                    target="blank"
                    className="first"
                  >
                    Contact
                  </a>
                </div>
                <div className="second-wrap">
                  <a
                    href="https://github.com/fariasmateuss?tab=repositories"
                    target="blank"
                    className="second"
                  >
                    Projects
                  </a>
                </div>
              </div>
            </div>

            <div className="right">
              <div>
                <h3 className="number">{user?.public_repos}</h3>
                <h3 className="number-title">Repositories</h3>
              </div>
              <div>
                <h3 className="number">{user?.following}</h3>
                <h3 className="number-title">Following</h3>
              </div>
              <div>
                <h3 className="number">{user?.followers}</h3>
                <h3 className="number-title">Followers</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Card;
