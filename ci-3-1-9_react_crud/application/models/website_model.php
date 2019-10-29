<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Website_model extends CI_Model {

    private $website = 'website';
    private $book ='book';
    
	function get_website_list() {
        $query = $this->db->get($this->website);
        if ($query) {
            return $query->result();
        }
        return NULL;
    }

    function get_IssueDetail_list(){
        $query = $this->db->get('issuedetail');
        if ($query) {
            return $query->result();
        }
        return NULL;
    }

    function get_Member_list(){
        $query = $this->db->get('member');
        if ($query) {
            return $query->result();
        }
        return NULL;
    }
    function get_Book_list() {
        $query = $this->db->get('book');
        if ($query) {
            return $query->result();
        }
        return NULL;
    }
    function get_Book($id){
        $query = $this->db->get_where('book', array("bookId" => $id));
        if ($query) {
            return $query->row();
        }
        return NULL;
    }
    function get_Member($id){
        $this->db->select('member.Id, member.memberid,member.memberName,member.address,member.contactNo,member.isAdmin,userLogin.email ');
        $this->db->from('member');
        $this->db->join('userLogin', 'member.memberid = userLogin.memberid  ');
       $this->db->where('member.memberid' , $id);
        $query = $this->db->get();
        if ($query) {
           $row= $query->row();
           
            return $row;
        }
        return NULL;
    }
    
    function get_website($id) {
        $query = $this->db->get_where($this->website, array("id" => $id));
        if ($query) {
            return $query->row();
        }
        return NULL;
    }
	
	function add_website($website_title, $website_url) {
        $data = array('title' => $website_title, 'url' => $website_url);
        $this->db->insert($this->website, $data);
    }
    function add_Book( $bookName, $auther, $category, $price){
        $data = array('bookId'=>'B003','bookName' => $bookName, 'auther' => $auther, 'Categoryid' => $category, 'price' => $price, 'isAvailable'=>1);
        $this->db->insert('book', $data);

    }
    function add_Member(  $memberName, $address, $contactNo, $type, $email){
    //     $this->db->select_max('Id');
    //     $result= $this->db->get('member')->row()->memberid;
    //    $memberid =$result+1;


        $data = array('memberid'=>'M003', 'memberName' => $memberName, 
                        'address' => $address, 'contactNo' => $contactNo, 'status'=>1, 'isAdmin'=>$type);

        $data1 = array('memberid'=>'M003', 'isAdmin' => $type, 'email'=>$email,'Password'=>'user@123', 'status'=>1);
        $this->db->insert('member', $data);
        $this->db->insert('userlogin', $data1);
    }

    function next_id($id){
       $letter= $id[0];
       $no = number_format(substr($id, 1, 3))+1 ;
       if($no<10){
        return $letter+"00"+$no;
       }else if($no<100){
        return $letter+"0"+$no;
       }else{
        return $id;
       }
       
    }
    function issue_book(  $date, $bookId, $memberId, $returnDate){
        $data = array('date'=>$date,'bookId' => $bookId, 'memberId' => $memberId, 'returnDate' => $returnDate,
         'isReturn' => '0');
        $this->db->insert('issuedetail', $data);

    }
    
    function update_website($website_id, $website_title, $website_url) {
        $data = array('title' => $website_title, 'url' => $website_url);
        $this->db->where('id', $website_id);
        $this->db->update($this->website, $data);
    }
    function update_Book($id, $bookName, $auther, $category, $price) {
        $data = array('bookName' => $bookName, 'auther' => $auther, 
        'Categoryid' => $category, 'price' => $price);
        $this->db->where('Id', $id);
        $this->db->update('book', $data);
    }
    
    function update_Member($id, $memberName, $address, $contactNo, $type, $email){
        $data = array('memberName' => $memberName, 'address' => $address, 
        'contactNo' => $contactNo, 'isAdmin' => $type);
        $this->db->where('Id', $id);
        $this->db->update('member', $data);


    }
	function delete_website($website_id) {
        $this->db->where('id', $website_id);
        $this->db->delete($this->website);
    }

    function delete_Book($id) {
        $this->db->where('bookId', $id);
        $this->db->delete('book');
    }

    function delete_Member($id) {
        $this->db->where('memberId', $id);
        $this->db->delete('member');
    }

}