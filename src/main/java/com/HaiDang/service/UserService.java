package com.HaiDang.service;

import com.HaiDang.exception.UserException;
import com.HaiDang.model.User;

public interface UserService {
    public User findUserById(Long userId) throws UserException;
    public User findUserProfileByJwt(String jwt) throws UserException;
}